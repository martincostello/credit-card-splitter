// Copyright (c) Martin Costello, 2020. All rights reserved.
// Licensed under the Apache 2.0 license. See the LICENSE file in the project root for full license information.

using Shouldly;
using Xunit;
using Xunit.Abstractions;

namespace MartinCostello.CreditCardSplitter
{
    public class CalculatorTests
    {
        public CalculatorTests(ITestOutputHelper outputHelper)
        {
            OutputHelper = outputHelper;
        }

        private ITestOutputHelper OutputHelper { get; }

        [Fact]
        public void Run_Test()
        {
            true.ShouldBeTrue();
        }
    }
}
