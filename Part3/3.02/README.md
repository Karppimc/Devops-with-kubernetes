# 📚 Exercise 3.02
- Mainly just tweaking with ingress and services/deploy manifests
- Upgraded GKE nodes to standard because of memory issues



### ✅ Verification:
- curl http://34.88.124.122/log
2025-01-07T19:58:34.592Z: 2gsu1m. Ping / Pongs: This is sample information for log-output application.
Env Variable: Hello from Log Output!

- curl http://34.88.124.122/pingpong
{"message":"pong","pongCount":16}

