import unittest
from calc import Calc

class Test1(unittest.TestCase):

    def setUp(self):
        self.calc = Calc()

    def test_method_1(self):
        sum = self.calc.add(2,4)
        print("\n\n sum",sum)
        self.assertEqual(sum,6,"answer should be 6")
        #Third argument will be displayed as error msg in case of assertion error.

        sub = self.calc.sub(8,4)
        print("\n\n subtraction",sub)
        self.assertEqual(sub,4,"answer should be 4")

        listitem = [1,2,3,4,6,9]
        self.assertIn(sum,listitem)

        test_var = 8
        self.assertNotIn(test_var,listitem)
    
    def tearDown(self):
        print("\n\n tearDown called")

unittest.main()