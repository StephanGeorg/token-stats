# token-stats

Generate statistical information of the availability of tokens or compounds in texts.

## Installation

```
git clone git@github.com:StephanGeorg/token-stats.git
cd token-stats
npm i
```
Download models from [nnsplit repo](https://github.com/bminixhofer/nnsplit/tree/main/models).

## Usage

```bash
> npm run cli -- <path/to/input.csv> </path/to/output.csv> -m </path/to/model.onnx> [-s] [-t] [-c]
```

### Options

Parameter    | Default      | Description
------------ | ------------ | -------------
Input        | Required     | Path to input file
Output       | Required     | Path to output file
-m           | Required     | Path to the model file (onnx) 
-s           | -1 (last)    | Index of desired sentence in text
-t           | -1 (last)    | Index of desired token in sentence
-c           | -1 (last)    | Index of desired constituent in token