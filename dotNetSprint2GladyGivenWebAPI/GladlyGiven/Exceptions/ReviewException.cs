namespace GladyGivenWebAPI.Exceptions
{
    public class ReviewException : Exception
    {
        string ClassOrigin, MethodOrigin, Error;

        public ReviewException(string classOrigin, string methodOrigin, string error)
        {
            ClassOrigin = classOrigin;
            MethodOrigin = methodOrigin;
            Error = error;
        }

        public override string Message => $"There is an error {Error} in the method {MethodOrigin} in the class {ClassOrigin}";
    }
}
