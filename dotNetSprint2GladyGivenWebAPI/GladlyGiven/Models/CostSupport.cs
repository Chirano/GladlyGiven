﻿//Author: Lia Araruna

using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using GladlyGiven.Enums;

namespace GladlyGiven.Models
{
	public class CostSupport
	{
        [Key]
        public long Id { get; set; }

        public double Amount { get; set; }

        public string Description { get; set; }

        public long AppointmentId { get; set; }

        [JsonPropertyName("userId")]
        public long ServiceProviderId { get; set; }

        public CostSupportType Type { get; set; }

        public string DateRequest { get; set; }

        public CostSupportStatus Status { get; set; }

        public CostSupport()
        {
        }
    }
}

