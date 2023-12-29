export type ErrorResponse = {
  status: number;
  data: {
    errors: [
      {
        message: string;
      },
    ];
  };
};

export type ErrorFetch = {
  status: string;
  error: string;
};
