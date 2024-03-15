namespace GladlyGiven.Models
{
    public class CostSupportPayment
    {
        public long Id { get; set; }

        public long CostSupportId { get; set; }

        public CostSupport? CostSupport { get; set; }

        public double Amount { get; set; }

        public string? PaymentDate { get; set; } 

        public CostSupportPayment() { }
    }
}
