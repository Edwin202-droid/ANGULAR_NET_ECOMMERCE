namespace Core.Entities
{
    public class CarritoItem
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal Price { get; set; }
        public int Cantidad { get; set; }
        public string PictureUrl { get; set; }
        public string Marca { get; set; }
        public string Tipo { get; set; }
    }
}