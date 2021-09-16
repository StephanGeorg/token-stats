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

## Example Output

```csv
name,count
straße,126369
weg,32322
platz,8271
berg,8177
gasse,6808
ring,3577
feld,3516
kamp,3476
allee,2763
mühle,2576
brücke,2518
bach,2482
garten,2346
graben,2265
grund,1665
wiese,1661
damm,1557
pfad,1524
busch,1472
```