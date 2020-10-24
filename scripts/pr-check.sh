#!/bin/bash

echo - name: Check Format
npm run format:check
echo - name: Lint Workspace & Code
npm run nx -- workspace-lint
npm run affected:lint -- --all
echo - name: Unit Tests
npm run affected:test -- --all
echo - name: Test Builds
npm run affected:build -- --all
