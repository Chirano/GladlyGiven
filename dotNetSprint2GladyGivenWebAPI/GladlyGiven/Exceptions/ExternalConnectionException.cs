namespace Backup.Exceptions
{
    //Author:Sónia Ribeiro

    /// <summary>
    /// Exception class for errors related to external connections.
    /// </summary>
    public class ExternalConnectionException : Exception
    {

        /// <summary>
        /// Gets or sets the error message for the exception.
        /// </summary>
        public string Message { get; private set; }


        /// <summary>
        /// ExternalConnectionException constructor, that initializes a new instance of this class
        /// </summary>
        /// <param name="message">The error message describing the cause of the exception</param>

        public ExternalConnectionException(string message) 
        {
            Message = message;
        }
    }
}
