import quizReducer, { setAnswer, reset } from './quizStore';

describe('quizSlice reducer', () => {
  it('should handle setAnswer', () => {
    const state = {
      categories: [],
      questions: [],
      answers: {},
      score: null
    };

    const next = quizReducer(state, setAnswer({ id: '123', answer: 'A' }));
    expect(next.answers['123']).toBe('A');
  });

  it('should reset state', () => {
    const state = {
      categories: [],
      questions: [],
      answers: { '123': 'A' },
      score: 5
    };

    const next = quizReducer(state, reset());
    expect(next.answers).toEqual({});
    expect(next.score).toBe(null);
  });
});