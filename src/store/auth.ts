import create from 'zustand';

interface IAuthStore {
  authRouter: any[];
  setState: (params: any) => void;
}

const useAuthStore = create<IAuthStore>(set => ({
  authRouter: [],
  setState: params => {
    set({
      ...params,
    });
  },
}));

export { useAuthStore };
