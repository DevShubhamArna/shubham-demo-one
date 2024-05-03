using minimal_api.Server.DataContext;
using minimal_api.Server.Service.IServices;

namespace minimal_api.Server.Service.Services
{
    public class TenantService : ITenantService
    {
        private readonly List<Tenant> _tenants;

        public TenantService()
        {
            _tenants = new List<Tenant>
            {
                new Tenant { Id = 1, Host = "foo", IsActive = true, ThemeName = "light" , Color="black"},
                new Tenant { Id = 2, Host = "bar", IsActive = true, ThemeName = "dark" ,Color="white"},
            };
        }

        public IEnumerable<Tenant> GetAllTenants()
        {
            return _tenants;
        }

        public Tenant GetTenantById(int id)
        {
            return _tenants.FirstOrDefault(t => t.Id == id);
        }

        public Tenant GetTenantByHost(string host)
        {
            return _tenants.FirstOrDefault(t => string.Equals(t.Host, host, StringComparison.OrdinalIgnoreCase));
        }
    }
}
