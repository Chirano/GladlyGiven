using System;
namespace GladlyGiven.Exceptions
{
	public class EntityDoesntExistException : Exception
	{
        public string errorOrigin, classOrigin, methodOrigin;

        public EntityDoesntExistException(string errorOrigin, string classOrigin, string methodOrigin)
		{
            this.errorOrigin = errorOrigin;
            this.classOrigin = classOrigin;
            this.methodOrigin = methodOrigin;
        }
        public override string Message => $"There is an error while working with this item in {this.errorOrigin} "
          + $"(origin class: {this.classOrigin}, origin method: {this.methodOrigin}";
    }
}

