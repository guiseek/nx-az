#!/bin/bash

echo - name: Check Format
yarn format:check
echo - name: Lint Workspace & Code
yarn nx workspace-lint
yarn affected:lint --all
echo - name: Unit Tests
yarn affected:test --all
echo - name: Test Builds
yarn affected:build --all
