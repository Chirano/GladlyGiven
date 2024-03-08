namespace Backup.Exceptions
{
    public class ExternalConnectionException : Exception
    {
        public string Message { get; private set; }
        public ExternalConnectionException(string message) 
        {
            Message = message;
        }
    }
}
