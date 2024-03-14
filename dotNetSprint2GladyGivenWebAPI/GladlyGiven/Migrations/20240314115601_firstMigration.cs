using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GladlyGiven.Migrations
{
    /// <inheritdoc />
    public partial class firstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<long>(type: "NUMBER(19)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Name = table.Column<string>(type: "NVARCHAR2(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CostSupports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "NUMBER(19)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Amount = table.Column<double>(type: "BINARY_DOUBLE", nullable: false),
                    Description = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    AppointmentId = table.Column<long>(type: "NUMBER(19)", nullable: false),
                    ServiceProviderId = table.Column<long>(type: "NUMBER(19)", nullable: false),
                    Type = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    DateRequest = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Status = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CostSupports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Donations",
                columns: table => new
                {
                    Id = table.Column<long>(type: "NUMBER(19)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DonorId = table.Column<long>(type: "NUMBER(19)", nullable: false),
                    Amount = table.Column<double>(type: "BINARY_DOUBLE", nullable: false),
                    DonationType = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    FiscalIdentity = table.Column<int>(type: "NUMBER(10)", nullable: false),
                    Date = table.Column<string>(type: "NVARCHAR2(2000)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRequest",
                columns: table => new
                {
                    Id = table.Column<long>(type: "NUMBER(19)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    DateRequest = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    IdCategory = table.Column<long>(type: "NUMBER(19)", nullable: false),
                    Description = table.Column<string>(type: "NVARCHAR2(2000)", nullable: false),
                    Status = table.Column<int>(type: "NUMBER(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRequest", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Id = table.Column<long>(type: "NUMBER(19)", nullable: false)
                        .Annotation("Oracle:Identity", "START WITH 1 INCREMENT BY 1"),
                    Description = table.Column<string>(type: "NVARCHAR2(100)", maxLength: 100, nullable: false),
                    CategoryId = table.Column<long>(type: "NUMBER(19)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Service_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Service_CategoryId",
                table: "Service",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CostSupports");

            migrationBuilder.DropTable(
                name: "Donations");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "ServiceRequest");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
