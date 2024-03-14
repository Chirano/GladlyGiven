namespace GladlyGiven.Models
{
    public class DonationReport
    {
        public Decimal Amount;

        public long Donors;

        public long Appointments;
    
        public DonationReport(Decimal amount, long donors) 
        {
            this.Amount = amount;
            this.Donors = donors;
            
        }
    }

    
}
