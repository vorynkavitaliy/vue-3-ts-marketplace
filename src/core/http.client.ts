class HttpClient {
  get<F>(_callback: () => F): Promise<F> {
    return this.invokeCallback(_callback);
  }

  post<F>(_callback: () => F): Promise<F> {
    return this.invokeCallback(_callback);
  }

  private invokeCallback<T>(_callback: () => T): Promise<T> {
    return new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => {
        try {
          const mockData: T = _callback();

          if (mockData && (mockData as any).error) {
            reject((mockData as any).error);
          } else {
            resolve(mockData);
          }
        } catch (error) {
          reject(error);
        } finally {
          clearTimeout(timeout);
        }
      }, 500);
    });
  }
}

export default new HttpClient();
