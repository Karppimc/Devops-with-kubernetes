# 📄 Exercise 2.06: ConfigMaps Integration
## 🛠️ What We Did:
- Created a ConfigMap: Defined a file (information.txt) and an environment variable (MESSAGE) in the ConfigMap.
- Mounted ConfigMap as a Volume: Mapped information.txt into the container at /usr/src/app/config.
- Set Environment Variable: Passed the MESSAGE variable from the ConfigMap to the container.
- Updated Application Logic: Displayed both the file content and the environment variable in the application output.
- Verified Changes: Confirmed correct values via HTTP requests and pod inspection.

### ✅ Outcome Example:

```bash
curl http://172.21.25.41/log
2024-12-29T12:15:15.683Z: lsbopm. Ping / Pongs: this text is from file
Env Variable: hello world
```

