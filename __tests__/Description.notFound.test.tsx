import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Description } from '../src/components/Description';

jest.mock('../src/services/getJobs', () => ({
  useGetJobByidQuery: jest.fn(),
}));



const mockUseGetJobByidQuery = require('../src/services/getJobs').useGetJobByidQuery as jest.Mock;

test('shows NotFound when id is missing', () => {
  render(
    <MemoryRouter initialEntries={['/Descrpition']}>
      <Routes>
        <Route path="/Descrpition" element={<Description />} />
      </Routes>
    </MemoryRouter>
  );

  // The NotFound component renders a link text "Go back home" in your code.
  expect(screen.getByText(/Go back home/i)).toBeInTheDocument();
});

test('shows "Job not found" when API returns no job', () => {
  mockUseGetJobByidQuery.mockReturnValue({ data: undefined, isLoading: false, error: undefined });

  render(
    <MemoryRouter initialEntries={['/Descrpition/job-999']}>
      <Routes>
        <Route path="/Descrpition/:id" element={<Description />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Job not found/i)).toBeInTheDocument();
});
