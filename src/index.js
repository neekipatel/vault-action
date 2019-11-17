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

    console.log("kv = ", kv);

    const value = await vault.read('secret/hello')

    console.log("value = ", value);

    core.exportVariable('hello', 'value');
    core.setOutput('hi', 'their');
  } catch (error) {
    core.setFailed(error.message);
  }
})();
