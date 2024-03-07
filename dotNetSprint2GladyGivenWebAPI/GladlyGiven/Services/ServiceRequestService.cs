// Author: Hugo Lopes

using GladyGivenWebAPI.Data;

namespace GladyGivenWebAPI.Services
{
    internal class ServiceRequestService
    {
        private ApplicationContextDb context;

        public ServiceRequestService(ApplicationContextDb context)
        {
            this.context = context;
        }
    }
}