using System.Globalization;

var path = args[0];
var lines = await File.ReadAllLinesAsync(path);

var enGB = CultureInfo.GetCultureInfo("en-GB");
var transactions = new List<Transaction>(lines.Length - 1);

foreach (var line in lines[1..])
{
    var parts = SplitCsv(line);

    var transaction = new Transaction(
        DateOnly.Parse(parts[0], enGB),
        parts[1],
        parts[2],
        parts[3],
        decimal.Parse(parts[4], enGB));

    if (!transaction.Description.StartsWith("PAYMENT RECEIVED", StringComparison.OrdinalIgnoreCase))
    {
        transactions.Add(transaction);
    }
}

var paymentDue = transactions.Sum((p) => p.Amount);
var amountsBeforeSplits = transactions.GroupBy((p) => p.CardMember).ToDictionary((p) => p.Key, (p) => p.Sum((q) => q.Amount));

Console.WriteLine(string.Format(enGB, "Payment Due: \u001b[32m{0:C}\u001b[0m", transactions.Sum((p) => p.Amount)));
Console.WriteLine();

foreach ((var member, var amount) in amountsBeforeSplits)
{
    Console.WriteLine($"  - \u001b[35m{member}\u001b[0m owes \u001b[36m{amount:C}\u001b[0m", enGB);
}

var amounts = new Dictionary<string, decimal>();

foreach (var member in amountsBeforeSplits.Keys)
{
    amounts[member] = default;
}

string[] autoSplits =
[
    "AMAZON PRIME",
    "MONMOUTH COFFEE",
    "PRIME VIDEO CHANNELS",
    "SAINSBURYS ONLINE",
    "WM MORRISONS STORES",
];

string[] nonSplits =
[
    "APPLE.COM/BILL",
    "DNSIMPLE",
    "SNB S201659",
    "TAKEAWAY.COM",
    "TFL TRAVEL CHARGE",
];

var splits = transactions.GroupBy((p) => p.CardMember);

foreach (var member in splits)
{
    Console.WriteLine();
    Console.WriteLine($"Card Member: \u001b[35m{member.Key}\u001b[0m");
    Console.WriteLine();

    foreach (var transaction in member.OrderBy((p) => p.Date))
    {
        if (!nonSplits.Any(transaction.Description.Contains))
        {
            bool split = autoSplits.Any(transaction.Description.Contains);

            if (!split)
            {
                Console.Write($"{transaction.Date} - \u001b[33m{transaction.Description}\u001b[0m \u001b[36m{transaction.Amount:C}\u001b[0m. Split? ", enGB);

                if (Console.ReadKey().KeyChar is 'y' or 'Y')
                {
                    split = true;
                }

                Console.WriteLine();
            }

            transaction.Split = split;
        }
    }
}

Console.WriteLine();

foreach (var transaction in transactions)
{
    if (transaction.Split)
    {
        var split = transaction.Amount / amounts.Count;

        foreach (var member in amounts.Keys)
        {
            amounts[member] += split;
        }
    }
    else
    {
        amounts[transaction.CardMember] += transaction.Amount;
    }
}

var computedPaymentDue = amounts.Values.Sum();

if (paymentDue != computedPaymentDue)
{
    Console.WriteLine($"Something went wrong - the computed amounts don't equal the payment due. Expected: \u001b[32m{paymentDue:C}\u001b[0m; Actual: \u001b[31m{computedPaymentDue:C}\u001b[0m", enGB);
    Console.WriteLine();
}

foreach ((var member, var amount) in amounts)
{
    Console.WriteLine($"\u001b[35m{member}\u001b[0m owes \u001b[32m{amount:C}\u001b[0m", enGB);
}

Console.WriteLine();
Console.Write("Press enter to exit.");
Console.ReadLine();

static IList<string> SplitCsv(string line)
{
    if (line.IndexOf('"', StringComparison.Ordinal) is -1)
    {
        return line.Split(',');
    }

    var parts = new List<string>(5);
    var remaining = line.AsSpan();

    while (remaining.Length > 0)
    {
        int thisIndex;
        int restIndex;

        if (remaining[0] is '"')
        {
            remaining = remaining[1..];
            thisIndex = remaining.IndexOf('"');
            restIndex = thisIndex + 2;
        }
        else
        {
            thisIndex = remaining.IndexOf(',');
            restIndex = thisIndex + 1;

            if (thisIndex is -1)
            {
                parts.Add(new(remaining));
                break;
            }
        }

        parts.Add(new(remaining[..thisIndex]));
        remaining = remaining[restIndex..];
    }

    return parts;
}

sealed record Transaction(
    DateOnly Date,
    string Description,
    string CardMember,
    string AccountNumber,
    decimal Amount)
{
    public bool Split { get; set; }
}
