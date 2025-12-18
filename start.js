module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "../../env",
        env: {
          "PYTORCH_ENABLE_MPS_FALLBACK": "1"  
        },
        path: "app/inference/gradio_composite_demo",
        message: [
          "python cogstudio.py"
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
