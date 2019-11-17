const core = require('@actions/core');
const VaultClient = require('node-vault');

(async () => {
  try {
    const endpoint = core.getInput('endpoint', { required: true });
    const token = core.getInput('token', { required: true });

    const vault = VaultClient({
      apiVersion: 'v1',
      endpoint: endpoint,
      token: token
    });

    const kv = core.getInput('kv');
    const res = await vault.read(kv)
    const secret = Object.keys(res.data);

    secret.map((key) => {
      core.setSecret(res.data[key]);
      core.exportVariable(key, res.data[key])
    });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
