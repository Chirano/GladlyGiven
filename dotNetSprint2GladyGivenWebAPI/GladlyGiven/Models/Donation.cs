using GladlyGiven.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace GladlyGiven.Models
{
    public class Donation
    {
        [Key]
        public long Id { get; set; }

        public long UserId { get; set; }

        public double Amount { get; set; }

        [EnumDataType(typeof(DonationType))]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public DonationType DonationType { get; set; }

        [EnumDataType(typeof(FiscalIdentity))]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public FiscalIdentity FiscalIdentity { get; set; }

        public DateTime Date { get; set; }
        
    }
}
