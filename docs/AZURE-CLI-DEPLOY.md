## Azure CLI Deployment (Storage Static Website)

Prereqs
- Azure CLI installed and logged in: `az login --use-device-code`
- Subscription selected: `az account set --subscription "<SUB_ID_OR_NAME>"`

1) Build the app (from project root)
```powershell
cd F:\org\own\yatricloud\keyyatri-live
$env:VITE_SUPABASE_URL="https://<your-ref>.supabase.co"
$env:VITE_SUPABASE_ANON_KEY="<your-anon-key>"
npm ci
npm run build
```

2) Create resource group + StorageV2 with Static Website
```powershell
$rg="rg-keyyatri"
$loc="eastus"
$sa="keyyatri$((Get-Random -Maximum 99999))"   # must be globally unique

az group create -n $rg -l $loc
az storage account create -n $sa -g $rg -l $loc --sku Standard_LRS --kind StorageV2
az storage blob service-properties update --account-name $sa --static-website --index-document index.html --404-document index.html
```

3) Upload build output to $web
Option A (RBAC via AAD, requires role assignment):
```powershell
# Assign yourself Storage Blob Data Contributor (one-time)
$scope=$(az storage account show -n $sa -g $rg --query id -o tsv)
$userId=$(az ad signed-in-user show --query id -o tsv)
az role assignment create --assignee-object-id $userId --assignee-principal-type User --role "Storage Blob Data Contributor" --scope $scope

# Wait ~60s for role to propagate, then upload
$dist="F:\org\own\yatricloud\keyyatri-live\dist"
az storage blob upload-batch --auth-mode login --account-name $sa -s $dist -d '$web' --overwrite
```

Option B (Account Key)
```powershell
$dist="F:\org\own\yatricloud\keyyatri-live\dist"
$key=$(az storage account keys list -n $sa -g $rg --query "[0].value" -o tsv)
az storage blob upload-batch --account-name $sa --account-key $key -s $dist -d '$web' --overwrite
```

4) Get the site URL
```powershell
az storage account show -n $sa -g $rg --query "primaryEndpoints.web" -o tsv
```

Update later (re-deploy only)
```powershell
npm run build
# then upload again using either Option A or B above
```

Troubleshooting
- `404` after upload: wait 30–60s, ensure `index.html` in `$web`.
- `permission` errors with `--auth-mode login`: use Option B (account key) or wait for RBAC propagation.
