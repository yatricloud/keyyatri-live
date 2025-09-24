## Azure Portal Deployment (Storage Static Website)

Prereqs
- Built app (or you can upload later): run locally `npm run build`

1) Create Storage Account
- Portal → Create a resource → Storage account
- Subscription: choose yours
- Resource group: `rg-keyyatri` (or new)
- Storage account name: globally unique, lowercase (e.g., `keyyatri12345`)
- Region: close to users (e.g., East US)
- Performance: Standard; Redundancy: LRS
- Review + Create → Create

2) Enable Static Website
- Go to the storage account → Data Management → Static website
- Enable → Index document: `index.html`
- Error document path: `index.html`
- Save
- Copy the Primary endpoint URL shown

3) Upload build output
- Go to Data storage → Containers → `$web`
- Click Upload → select all files inside your local `dist/`
- Ensure `index.html` is at the root of `$web`

4) Open the site
- Use the Primary endpoint URL you copied in step 2

Optional: Custom Domain via Azure CDN/Front Door
- Create Front Door (standard/premium) or Azure CDN profile
- Add endpoint → origin is your Storage Static Website
- Add custom domain → verify CNAME → enable HTTPS

Updates
- Each new release: run `npm run build`, then Upload updated `dist/` files to `$web`

