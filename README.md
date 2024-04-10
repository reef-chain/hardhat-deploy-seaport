# Seaport Contracts Deployment

Deployment scripts for [Seaport 1.5](https://github.com/ProjectOpenSea/seaport/tree/bc94af2738d88a048900a8b47bcf699b7988ea43) contracts in Reef Chain.

## Usage

Create `.env` file from example file and add deployer account mnemonic.

```bash
cp .env.example .env
```

### Deploy

```bash
yarn deploy
```

By default, contracts will be verified. To skip verification, set `SKIP_VERIFICATION=true` in `.env` file.

### Verify

```bash
yarn verify
```

