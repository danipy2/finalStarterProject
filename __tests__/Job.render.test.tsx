import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Job from '../src/components/Job';

// ----------------------
// Mock API hooks
// ----------------------
jest.mock('../src/services/bookmarkApi', () => ({
  useGetBookmarksQuery: jest.fn(),
  useAddBookmarkMutation: jest.fn(),
  useRemoveBookmarkMutation: jest.fn(),
}));

const mockUseGetBookmarksQuery = require('../src/services/bookmarkApi').useGetBookmarksQuery as jest.Mock;
const mockUseAddBookmarkMutation = require('../src/services/bookmarkApi').useAddBookmarkMutation as jest.Mock;
const mockUseRemoveBookmarkMutation = require('../src/services/bookmarkApi').useRemoveBookmarkMutation as jest.Mock;

// ----------------------
// Dummy reducer for test store
// ----------------------
const dummyReducer = (state = {}) => state;

const testStore = configureStore({
  reducer: { dummy: dummyReducer },
});

// ----------------------
// Helper render
// ----------------------
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

// ----------------------
// Tests
// ----------------------
describe('Job component renders correctly', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    // Default bookmarks empty
    mockUseGetBookmarksQuery.mockReturnValue({ data: { data: [] } });

    // Mutations mocked as tuples
    mockUseAddBookmarkMutation.mockReturnValue([jest.fn()]);
    mockUseRemoveBookmarkMutation.mockReturnValue([jest.fn()]);
  });

  test('renders basic job information', () => {
    renderJob();
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
    expect(screen.getByText('Build great UIs.')).toBeInTheDocument();
  });

  test('renders bookmark toggle button', async () => {
    renderJob();
    await act(async () => {
      const btn = screen.getByTestId('bookmark-toggle');
      fireEvent.click(btn);
    });
    expect(screen.getByTestId('bookmark-toggle')).toBeInTheDocument();
  });
});
