import unittest
import json

from app import app


class MovieTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.client = self.app.test_client

    def tearDown(self):
        pass

    def test_get_movies(self):
        res = self.client().get('/api/movies')  # Home page
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(len(data['movies']))

    def test_create_movie(self):
        res = self.client().post('/api/movies/create')  # No token provided
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)  # Unauthorized
        self.assertEqual(data['success'], False)

    def test_delete_movie(self):
        res = self.client().delete('/api/movies/1000', headers={
            "Authorization": "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVzVW1odnBZeDJWVHgyd3pzb1pHbSJ9"
                             ".eyJpc3MiOiJodHRwczovL2Rldi15bDJyYTdkay51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8"
                             "NjExZmJmMzViNTQwZGQwMDZiMmNhNTY3IiwiYXVkIjpbInVkYWNpdHktY2Fwc3RvbmUtYXBpIiwia"
                             "HR0cHM6Ly9kZXYteWwycmE3ZGsudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYyOTYxMDQ"
                             "zNiwiZXhwIjoxNjI5Njk2ODM2LCJhenAiOiJ0dXE3aEJJTVAwRm5wbU5WcEp0eWhNemdsakIyU3RG"
                             "NyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6Y"
                             "29tbWVudCIsImRlbGV0ZTptb3ZpZSIsInVwZGF0ZTptb3ZpZSIsIndyaXRlOmNvbW1lbnQiLCJ3cm"
                             "l0ZTptb3ZpZSIsIndyaXRlOnJhdGUiXX0.c1oInw1O5F_MPizOIjz-79RWOisF6rhb80sCcrm9f82T"
                             "1XlzjTCyj3IX6GD_Jn-k8ij8llKvzn2fpFITAZ8-B7IYEsLakK8-twTSW1hRwjhsKGFZhcMcZtPBT"
                             "t5WQbVEo8kV7inZAEZERi_mfAzMov3_bMNCky2mKPi3VuG9QaWDV2N4w-B5CnRg97vPm7_qN_Ph3X"
                             "m5AQMh_CEAWyt6wfYmgdYw8yxj1P9eyiCe0MaEKtGanlIWfdmYpWPrwQhYPyAt5m22rViS98pqouv"
                             "_aE-6VFMWp6WvzIhGPARlYbt84TPRZMugcMdMAWVpeFFp44H1w8dkEJfxEwcGAKaT8A"
        })  # token expierd
        data = json.loads(res.data)
        self.assertEqual(data['message'], "Token expierd")
        self.assertEqual(res.status_code, 401)  # Token expired
        self.assertEqual(data['success'], False)

    # def test_get_paginated_books(self):
    #     res = self.client().get('/books')
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertTrue(data['total_books'])
    #     self.assertTrue(len(data['books']))
    #
    # def test_404_sent_requesting_beyond_valid_page(self):
    #     res = self.client().get('/books?page=1000', json={'rating': 1})
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 404)
    #     self.assertEqual(data['success'], False)
    #     self.assertEqual(data['message'], 'resource not found')
    #
    # def test_get_book_search_with_results(self):
    #     res = self.client().post('/books', json={'search': 'Novel'})
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertTrue(data['total_books'])
    #     self.assertEqual(len(data['books']), 4)
    #
    # def test_get_book_search_without_results(self):
    #     res = self.client().post('/books', json={'search': 'applejacks'})
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertEqual(data['total_books'], 0)
    #     self.assertEqual(len(data['books']), 0)
    #
    # def test_update_book_rating(self):
    #     res = self.client().patch('/books/5', json={'rating': 1})
    #     data = json.loads(res.data)
    #     book = Book.query.filter(Book.id == 5).one_or_none()
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertEqual(book.format()['rating'], 1)
    #
    # def test_400_for_failed_update(self):
    #     res = self.client().patch('/books/5')
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 400)
    #     self.assertEqual(data['success'], False)
    #     self.assertEqual(data['message'], 'bad request')
    #
    # def test_delete_book(self):
    #     res = self.client().delete('/books/6')
    #     data = json.loads(res.data)
    #
    #     book = Book.query.filter(Book.id == 6).one_or_none()
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertEqual(data['deleted'], 6)
    #     self.assertTrue(data['total_books'])
    #     self.assertTrue(len(data['books']))
    #     self.assertEqual(book, None)
    #
    # def test_422_if_book_does_not_exist(self):
    #     res = self.client().delete('/books/1000')
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 422)
    #     self.assertEqual(data['success'], False)
    #     self.assertEqual(data['message'], 'unprocessable')
    #
    # def test_create_new_book(self):
    #     res = self.client().post('/books', json=self.new_book)
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data['success'], True)
    #     self.assertTrue(data['created'])
    #     self.assertTrue(len(data['books']))
    #
    # def test_405_if_book_creation_not_allowed(self):
    #     res = self.client().post('/books/45', json=self.new_book)
    #     data = json.loads(res.data)
    #
    #     self.assertEqual(res.status_code, 405)
    #     self.assertEqual(data['success'], False)
    #     self.assertEqual(data['message'], 'method not allowed')


if __name__ == "__main__":
    unittest.main()
