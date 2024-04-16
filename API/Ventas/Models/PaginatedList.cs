namespace Ventas.Models
{
    public class PaginatedList<T>
    {
        public required List<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }
}