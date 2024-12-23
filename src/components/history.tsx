import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

type History = {
    exchangeRate: number;
    fixedRate: string;
    amount: string;
    convertedAmount: string;
}[]

const History = ({historyData}: {historyData: History}) => {
    return (
        <Card>
        <CardHeader>
            <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableCaption>A list of your recent conversions.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Real Rate</TableHead>
                    <TableHead>Fixed Rate</TableHead>
                    <TableHead>Initial Value</TableHead>
                    <TableHead className="text-right">Converted Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {historyData.map((conversionItem, index) => (
                    <TableRow key={index}>
                        <TableCell>{conversionItem.exchangeRate}</TableCell>
                        <TableCell className="font-medium">{conversionItem.fixedRate}</TableCell>
                        <TableCell>{conversionItem.amount}</TableCell>
                        <TableCell className="text-right">{conversionItem.convertedAmount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    )
}
export default History