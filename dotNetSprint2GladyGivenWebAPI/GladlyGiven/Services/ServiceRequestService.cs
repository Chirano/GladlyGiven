// Author: Hugo Lopes




// Author: Hugo Lopes



using GladyGivenWebAPI.Data;

namespace GladyGivenWebAPI.Services
{
    internal class ServiceRequestService
    {
        private ServiceRequestDBContext context;

        public ServiceRequestService(ServiceRequestDBContext context)
        {
            this.context = context;
        }
    }
}