process.env.DEBUG = 'node-vault'; // switch on debug mode

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
    const secret = await vault.read(kv)
    Object.keys(secret.data).map((key, value) => {
      console.log('kv =', key, value);
      core.exportVariable(key, value)
    });
  } catch (error) {
    core.setFailed(error.message);
  }
})();
