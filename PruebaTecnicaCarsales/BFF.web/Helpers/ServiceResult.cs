using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BFF.web.Helpers
{
    public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public T? Data { get; set; }
        public int Code { get; set; }
        public string? ErrorMessage { get; set; }

        public static ServiceResult<T> Ok(T data) =>
            new() { Success = true, Data = data, Code = 200 };

        public static ServiceResult<T> Fail(string error, int code) =>
            new() { Success = false, ErrorMessage = error, Code = code };
    }
}
