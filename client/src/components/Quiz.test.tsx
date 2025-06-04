import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Quiz from './Quiz';
import { Provider } from 'react-redux';
import { store } from '../redux/';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockQs = [
     {
    id: 'q1',
    question: 'What is 2 + 2?',
    answers: ['2', '6', '8', '4'],
    correct_answer: '4'
  },
  {
    id: 'q2',
    question: 'What is the capital of France?',
    answers: ['Berlin','Paris', 'Madrid', 'Rome'],
    correct_answer: 'Paris'
  }
];

const mockCats = ['General Knowledge', 'Entertainment: Film'];


describe('Quiz Test', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
  });

  test('quiz ui rendering and submission', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockCats }) 
      .mockResolvedValueOnce({ data: mockQs }); 

    mockedAxios.post.mockResolvedValueOnce({ data: { score: 2 } });

    render(
      <Provider store={store}>
        <Quiz />
      </Provider>
    );

    // Wait for initial data load
    await waitFor(() => {
      expect(screen.getByText('Start a New Quiz')).toBeInTheDocument();
    });

    // Select category
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: 'General Knowledge' }
    });

    // Select difficulty
    fireEvent.change(screen.getByLabelText(/Difficulty/i), {
      target: { value: 'easy' }
    });

    // Click start
    fireEvent.click(screen.getByText(/Begin Quiz/i));

    // Wait for quiz to render
    await waitFor(() => {
      expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    });

    // Answer questions
    fireEvent.click(screen.getByRole('button', { name: '4' })); // correct for q1
    fireEvent.click(screen.getByRole('button', { name: 'Paris' })); // correct for q2

    // Submit
    fireEvent.click(screen.getByText(/Submit Quiz/i));

    // Wait for score
    await waitFor(() => {
      expect(screen.getByText(/Your Score: 2\/2/i)).toBeInTheDocument();
    });

    // Check feedback
    expect(screen.getByText('4')).toHaveStyle('color: rgb(0, 128, 0)');
    expect(screen.getByText('Paris')).toHaveStyle('color: rgb(0, 128, 0)');

    // Restart
    fireEvent.click(screen.getByText(/New Quiz/i));
    expect(screen.getByText(/Start a New Quiz/i)).toBeInTheDocument();
  });
});