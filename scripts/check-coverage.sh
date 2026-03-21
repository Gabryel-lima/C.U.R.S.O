#!/usr/bin/env sh
set -eu

PROJECT_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

if [ ! -f "$PROJECT_ROOT/coverage.xml" ]; then
  echo "coverage.xml not found. Run tests with coverage generation first." >&2
  exit 2
fi

# Extract line-rate from coverage.xml
LINE_RATE=$(grep -o 'line-rate="[0-9.]*"' "$PROJECT_ROOT/coverage.xml" | head -n1 | sed 's/line-rate="\([0-9.]*\)"/\1/')
if [ -z "$LINE_RATE" ]; then
  echo "Couldn't parse coverage line-rate" >&2
  exit 3
fi

# Convert to percentage
PCT=$(printf "%.0f" "$(echo "$LINE_RATE * 100" | bc -l)")
THRESHOLD=50
echo "Coverage: ${PCT}% (threshold ${THRESHOLD}%)"
if [ "$PCT" -lt "$THRESHOLD" ]; then
  echo "Coverage ${PCT}% is below threshold ${THRESHOLD}%" >&2
  exit 1
fi

echo "Coverage OK"
