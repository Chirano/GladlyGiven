namespace GladlyGiven.Exceptions
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// Exception class for donation-related errors.
    /// </summary>
    
    public class DonationException : Exception
    {

        /// <summary>
        /// ClassOrigin stores the name of the class where the exception originated
        /// MethodOrigin stores the name of the method where the exception originated
        /// Error stores the error message describing the cause of the exception
        /// </summary>

        string ClassOrigin, MethodOrigin, Error;

        /// <summary>
        /// DonationException constructor that initializes a new instance of this class
        /// </summary>
        /// <param name="classOrigin">The name of the class where the exception originated</param>
        /// <param name="methodOrigin">The name of the method where the exception originated</param>
        /// <param name="error">The error message describing the cause of the exception</param>

        public DonationException(string classOrigin, string methodOrigin, string error)
        {
            ClassOrigin = classOrigin;
            MethodOrigin = methodOrigin;
            Error = error;
        }


        /// <summary>
        /// Gets the error message that describes the current exception
        /// </summary>
        public override string Message => $"There is an error {Error} in the method {MethodOrigin} in the class {ClassOrigin}";
    }
}
