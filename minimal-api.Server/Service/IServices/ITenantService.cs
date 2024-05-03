using minimal_api.Server.DataContext;

namespace minimal_api.Server.Service.IServices
{
    public interface ITenantService
    {
        IEnumerable<Tenant> GetAllTenants();
        Tenant GetTenantById(int id);
        Tenant GetTenantByHost(string host);
    }
}
