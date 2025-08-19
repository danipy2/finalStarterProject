// __tests__/Job.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Job from '../src/components/Job';

// ------------------------------
// Mock RTK Query hooks
// ------------------------------
jest.mock('../src/services/bookmarkApi', () => ({
  useGetBookmarksQuery: jest.fn(),
  useAddBookmarkMutation: jest.fn(),
  useRemoveBookmarkMutation: jest.fn(),
}));

const mockUseGetBookmarksQuery = require('../src/services/bookmarkApi').useGetBookmarksQuery as jest.Mock;
const mockUseAddBookmarkMutation = require('../src/services/bookmarkApi').useAddBookmarkMutation as jest.Mock;
const mockUseRemoveBookmarkMutation = require('../src/services/bookmarkApi').useRemoveBookmarkMutation as jest.Mock;

// ------------------------------
// Create a minimal test store
// ------------------------------
const testStore = configureStore({
  reducer: {}, // empty reducer, just to provide context
});

// ------------------------------
// Helper to render Job with Provider & Router
// ------------------------------
function renderJob(props?: Partial<React.ComponentProps<typeof Job>>) {
  const defaults = {
    photo: '/logo.png',
    Title: 'Frontend Engineer',
    subtitle: ['Remote', 'Full-time'],
    description: 'Build great UIs.',
    fields: ['React', 'TypeScript'],
    ind: 'job-123',
    opType: 'Internship',
  };

  return render(
    <Provider store={testStore}>
      <MemoryRouter>
        <Job {...defaults} {...props} />
      </MemoryRouter>
    </Provider>
  );
}

// ------------------------------
// Tests
// ------------------------------
describe('Job bookmark toggle', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    // Default: no bookmarks
    mockUseGetBookmarksQuery.mockReturnValue({ data: { data: [] } });

    // Mutations return tuple: [triggerFn]
    mockUseAddBookmarkMutation.mockReturnValue([jest.fn().mockReturnValue({ unwrap: () => Promise.resolve({}) })]);
    mockUseRemoveBookmarkMutation.mockReturnValue([jest.fn().mockReturnValue({ unwrap: () => Promise.resolve({}) })]);

    // Ensure token exists unless test says otherwise
    window.localStorage.setItem('token', 'fake-token');
  });

  test('shows unbookmarked icon by default when not in bookmarks', () => {
    renderJob();
    const btn = screen.getByTestId('bookmark-toggle');
    expect(btn).toBeInTheDocument();
  });

  test('initially shows as bookmarked if id is in bookmarks', () => {
    mockUseGetBookmarksQuery.mockReturnValue({ data: { data: [{ eventID: 'job-123' }] } });
    renderJob();
    const btn = screen.getByTestId('bookmark-toggle');
    expect(btn).toBeInTheDocument();
  });

  test('clicking adds bookmark when not bookmarked', async () => {
    const addTrigger = jest.fn().mockReturnValue({ unwrap: () => Promise.resolve({}) });
    mockUseAddBookmarkMutation.mockReturnValue([addTrigger]);

    renderJob();
    const btn = screen.getByTestId('bookmark-toggle');
    fireEvent.click(btn);

    expect(addTrigger).toHaveBeenCalledWith('job-123');
  });

  test('clicking removes bookmark when already bookmarked', async () => {
    const removeTrigger = jest.fn().mockReturnValue({ unwrap: () => Promise.resolve({}) });
    mockUseRemoveBookmarkMutation.mockReturnValue([removeTrigger]);
    mockUseGetBookmarksQuery.mockReturnValue({ data: { data: [{ eventID: 'job-123' }] } });

    renderJob();
    const btn = screen.getByTestId('bookmark-toggle');
    fireEvent.click(btn);

    expect(removeTrigger).toHaveBeenCalledWith('job-123');
  });

  test('blocks unauthenticated user and shows alert', () => {
    window.localStorage.removeItem('token');
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderJob();
    const btn = screen.getByTestId('bookmark-toggle');
    fireEvent.click(btn);

    expect(alertSpy).toHaveBeenCalledWith('Please login to bookmark jobs.');
    alertSpy.mockRestore();
  });
});

// ------------------------------
// Optional: Render test for job info
// ------------------------------
test('renders basic job information', () => {
  renderJob({
    Title: 'Frontend Engineer',
    description: 'Build cool stuff',
    subtitle: ['Remote'],
    fields: ['React', 'TS'],
  });

  expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  expect(screen.getByText('Build cool stuff')).toBeInTheDocument();
  expect(screen.getByText('Remote')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('TS')).toBeInTheDocument();
});
