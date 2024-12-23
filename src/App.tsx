import { useCallback, useEffect, useState } from "react";
import History from "./components/history";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Switch } from "./components/ui/switch";


type HistoryType = {
    exchangeRate: number;
    fixedRate: string;
    amount: string;
    convertedAmount: string;
}[]

const Converter = () => {
    const [currentCurrency, setCurrentCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(1.1);
    const [fixedRate, setFixedRate] = useState('');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    const [history, setHistory] = useState<HistoryType>([]);

    const generateRandomRate = useCallback(() => {
        const variation = (Math.random() * 0.1) - 0.05;
        return Number((1.1 + variation).toFixed(4));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
          const newRate = generateRandomRate();
          setExchangeRate(newRate);
          
          if (fixedRate) {
            const variation = Math.abs(newRate - Number(fixedRate)) / Number(fixedRate);
            if (variation > 0.02) {
                setFixedRate('');
            } else {
                setExchangeRate(Number(fixedRate));
            }
          }
        }, 3000);
    
        return () => clearInterval(interval);
    }, [generateRandomRate, fixedRate]);

    useEffect(() => {
        if (!amount) {
            return;
        }
        let convert = 0;
        
        if(currentCurrency === 'EUR') {
            convert = Number((exchangeRate * amount).toFixed(2));
        }
        if(currentCurrency === 'USD') {
            convert = Number((amount / exchangeRate).toFixed(2));
        }
        setConvertedAmount(convert);

        // Limit this array to 5 last items
        if (history.length > 4) {
            setHistory((prev) => prev.slice(1));
        }
        setHistory((prev) => [...prev, {
            exchangeRate,
            fixedRate,
            amount: `${amount} ${currentCurrency}`,
            convertedAmount: `${convert} ${currentCurrency == 'EUR' ? 'USD' : 'EUR'}`,
        }])
    }, [currentCurrency, exchangeRate, amount]);

    const handleCheckChange = () => {
        if (currentCurrency === 'EUR') {
            setCurrentCurrency('USD');
        }
        if (currentCurrency === 'USD') {
            setCurrentCurrency('EUR');
        }

        setAmount(convertedAmount);
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Converter CACIB</CardTitle>
                    <CardDescription>EUR/USD Money Converter</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-[400px]">
                        <div className="flex justify-between items-center gap-2 mb-2">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <p>Current Rate</p>
                                <p>{exchangeRate}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <label htmlFor="">Fixed Rate</label>
                                <Input
                                    type="string"
                                    value={fixedRate}
                                    onChange={(e) => {
                                        setFixedRate(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <div className="flex justify-center items-center gap-2">
                                <label>{currentCurrency}</label>
                                <Input
                                    type="string"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(Number(e.target.value))
                                    }}
                                />
                            </div>
                        </div>
                        <div className="my-2 flex justify-between items-center gap-2">
                            <p className="text-2xl font-semibold text-center">
                                {convertedAmount} {currentCurrency == 'EUR' ? 'USD' : 'EUR'}
                            </p>
                            <div className="flex gap-2">
                                <span>EUR</span>
                                <Switch checked={currentCurrency === 'USD'} onCheckedChange={handleCheckChange}/>
                                <span>USD</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <History historyData={history}/>
        </div>
    )
}

export default Converter