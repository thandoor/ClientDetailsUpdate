using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TestUpdate.Startup))]
namespace TestUpdate
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
