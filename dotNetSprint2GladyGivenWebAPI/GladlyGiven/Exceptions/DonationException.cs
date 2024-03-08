namespace GladlyGiven.Exceptions
{
    public class DonationException : Exception
    {
        string ClassOrigin, MethodOrigin, Error;

        public DonationException(string classOrigin, string methodOrigin, string error)
        {
            ClassOrigin = classOrigin;
            MethodOrigin = methodOrigin;
            Error = error;
        }

        public override string Message => $"There is an error {Error} in the method {MethodOrigin} in the class {ClassOrigin}";
    }
}
