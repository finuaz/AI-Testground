#!/usr/bin/env bash

## smoke test
k6 run ./tests/performance/smoke/local.k6.js
# k6 run ./tests/performance/smoke/api.k6.js

## load test
k6 run ./tests/performance/load/local.k6.js
k6 run ./tests/performance/load/local_old.k6.js
k6 run ./tests/performance/load/api.k6.js
k6 run ./tests/performance/load/api_old.k6.js

## stress test
k6 run ./tests/performance/stress/local.k6.js
# k6 run ./tests/performance/stress/api.k6.js

## scalability test
k6 run ./tests/performance/scalability/local.k6.js
# k6 run ./tests/performance/scalability/api.k6.js

## soak test
# k6 run ./tests/performance/soak/local.k6.js
# k6 run ./tests/performance/soak/api.k6.js

## spike test
# k6 run ./tests/performance/spike/local.k6.js
# k6 run ./tests/performance/spike/api.k6.js

## capacity test
# k6 run ./tests/performance/capacity/local.k6.js
# k6 run ./tests/performance/capacity/api.k6.js

## volume test
# k6 run ./tests/performance/volume/local.k6.js
# k6 run ./tests/performance/volume/api.k6.js