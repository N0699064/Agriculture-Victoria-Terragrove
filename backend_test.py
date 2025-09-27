#!/usr/bin/env python3
"""
Victoria Terragrove Backend API Testing Suite
Tests the Newsletter and News APIs for functionality, error handling, and data consistency.
"""

import requests
import json
import time
import re
from typing import Dict, List, Any
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:3000"
NEWSLETTER_ENDPOINT = f"{BASE_URL}/api/newsletter"
NEWS_ENDPOINT = f"{BASE_URL}/api/news"

class APITester:
    def __init__(self):
        self.results = {
            "newsletter_api": {
                "tests_passed": 0,
                "tests_failed": 0,
                "details": []
            },
            "news_api": {
                "tests_passed": 0,
                "tests_failed": 0,
                "details": []
            }
        }
        
    def log_result(self, api_name: str, test_name: str, passed: bool, details: str):
        """Log test result"""
        result = {
            "test": test_name,
            "passed": passed,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        
        self.results[api_name]["details"].append(result)
        if passed:
            self.results[api_name]["tests_passed"] += 1
            print(f"✅ {test_name}: PASSED - {details}")
        else:
            self.results[api_name]["tests_failed"] += 1
            print(f"❌ {test_name}: FAILED - {details}")
    
    def is_valid_email_format(self, email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    def test_newsletter_api(self):
        """Test Newsletter API endpoints"""
        print("\n🧪 Testing Newsletter API...")
        
        # Test 1: Valid email subscription
        try:
            valid_email = "john.farmer@example.com"
            response = requests.post(
                NEWSLETTER_ENDPOINT,
                json={"email": valid_email},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "subscribed" in data["message"].lower():
                    self.log_result("newsletter_api", "Valid Email Subscription", True, 
                                  f"Status: {response.status_code}, Message: {data.get('message', 'N/A')}")
                else:
                    self.log_result("newsletter_api", "Valid Email Subscription", False, 
                                  f"Unexpected response format: {data}")
            else:
                self.log_result("newsletter_api", "Valid Email Subscription", False, 
                              f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("newsletter_api", "Valid Email Subscription", False, f"Exception: {str(e)}")
        
        # Test 2: Invalid email format
        try:
            invalid_emails = ["invalid-email", "test@", "@domain.com", "test.domain.com"]
            
            for invalid_email in invalid_emails:
                response = requests.post(
                    NEWSLETTER_ENDPOINT,
                    json={"email": invalid_email},
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 400:
                    data = response.json()
                    if "error" in data:
                        self.log_result("newsletter_api", f"Invalid Email Format ({invalid_email})", True, 
                                      f"Correctly rejected with status 400: {data['error']}")
                    else:
                        self.log_result("newsletter_api", f"Invalid Email Format ({invalid_email})", False, 
                                      f"Status 400 but no error message: {data}")
                else:
                    self.log_result("newsletter_api", f"Invalid Email Format ({invalid_email})", False, 
                                  f"Should return 400, got {response.status_code}: {response.text}")
                    
        except Exception as e:
            self.log_result("newsletter_api", "Invalid Email Format", False, f"Exception: {str(e)}")
        
        # Test 3: Missing email field
        try:
            response = requests.post(
                NEWSLETTER_ENDPOINT,
                json={},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 400:
                data = response.json()
                if "error" in data:
                    self.log_result("newsletter_api", "Missing Email Field", True, 
                                  f"Correctly rejected with status 400: {data['error']}")
                else:
                    self.log_result("newsletter_api", "Missing Email Field", False, 
                                  f"Status 400 but no error message: {data}")
            else:
                self.log_result("newsletter_api", "Missing Email Field", False, 
                              f"Should return 400, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("newsletter_api", "Missing Email Field", False, f"Exception: {str(e)}")
        
        # Test 4: Invalid JSON payload
        try:
            response = requests.post(
                NEWSLETTER_ENDPOINT,
                data="invalid json",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code in [400, 500]:
                self.log_result("newsletter_api", "Invalid JSON Payload", True, 
                              f"Correctly handled invalid JSON with status {response.status_code}")
            else:
                self.log_result("newsletter_api", "Invalid JSON Payload", False, 
                              f"Should return 400/500, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("newsletter_api", "Invalid JSON Payload", False, f"Exception: {str(e)}")
        
        # Test 5: Response time check
        try:
            start_time = time.time()
            response = requests.post(
                NEWSLETTER_ENDPOINT,
                json={"email": "performance.test@example.com"},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            response_time = time.time() - start_time
            
            if response_time < 5.0:  # Should respond within 5 seconds
                self.log_result("newsletter_api", "Response Time", True, 
                              f"Response time: {response_time:.2f}s (< 5s)")
            else:
                self.log_result("newsletter_api", "Response Time", False, 
                              f"Response time: {response_time:.2f}s (>= 5s)")
                
        except Exception as e:
            self.log_result("newsletter_api", "Response Time", False, f"Exception: {str(e)}")
    
    def test_news_api(self):
        """Test News API endpoints"""
        print("\n🧪 Testing News API...")
        
        # Test 1: Basic GET request
        try:
            response = requests.get(NEWS_ENDPOINT, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "articles" in data and isinstance(data["articles"], list):
                    self.log_result("news_api", "Basic GET Request", True, 
                                  f"Status: 200, Articles count: {len(data['articles'])}")
                else:
                    self.log_result("news_api", "Basic GET Request", False, 
                                  f"Missing or invalid 'articles' field: {data}")
            else:
                self.log_result("news_api", "Basic GET Request", False, 
                              f"Status: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_result("news_api", "Basic GET Request", False, f"Exception: {str(e)}")
        
        # Test 2: Article structure validation
        try:
            response = requests.get(NEWS_ENDPOINT, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                articles = data.get("articles", [])
                
                if len(articles) >= 3:  # Should return at least 3 articles
                    # Check first article structure
                    article = articles[0]
                    required_fields = ["title", "description", "url", "urlToImage", "publishedAt", "source"]
                    missing_fields = [field for field in required_fields if field not in article]
                    
                    if not missing_fields:
                        # Validate source structure
                        if isinstance(article["source"], dict) and "name" in article["source"]:
                            self.log_result("news_api", "Article Structure", True, 
                                          f"All required fields present, articles count: {len(articles)}")
                        else:
                            self.log_result("news_api", "Article Structure", False, 
                                          f"Invalid source structure: {article['source']}")
                    else:
                        self.log_result("news_api", "Article Structure", False, 
                                      f"Missing fields: {missing_fields}")
                else:
                    self.log_result("news_api", "Article Structure", False, 
                                  f"Expected at least 3 articles, got {len(articles)}")
            else:
                self.log_result("news_api", "Article Structure", False, 
                              f"Failed to fetch articles: {response.status_code}")
                
        except Exception as e:
            self.log_result("news_api", "Article Structure", False, f"Exception: {str(e)}")
        
        # Test 3: Content quality validation
        try:
            response = requests.get(NEWS_ENDPOINT, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                articles = data.get("articles", [])
                
                quality_issues = []
                for i, article in enumerate(articles[:3]):  # Check first 3 articles
                    if not article.get("title") or len(article["title"]) < 10:
                        quality_issues.append(f"Article {i+1}: Title too short or missing")
                    
                    if not article.get("description") or len(article["description"]) < 50:
                        quality_issues.append(f"Article {i+1}: Description too short or missing")
                    
                    if not article.get("urlToImage") or not article["urlToImage"].startswith("http"):
                        quality_issues.append(f"Article {i+1}: Invalid or missing image URL")
                
                if not quality_issues:
                    self.log_result("news_api", "Content Quality", True, 
                                  "All articles have adequate title, description, and image")
                else:
                    self.log_result("news_api", "Content Quality", False, 
                                  f"Quality issues: {'; '.join(quality_issues)}")
            else:
                self.log_result("news_api", "Content Quality", False, 
                              f"Failed to fetch articles: {response.status_code}")
                
        except Exception as e:
            self.log_result("news_api", "Content Quality", False, f"Exception: {str(e)}")
        
        # Test 4: Consistency across multiple calls
        try:
            responses = []
            for i in range(3):
                response = requests.get(NEWS_ENDPOINT, timeout=10)
                if response.status_code == 200:
                    responses.append(response.json())
                time.sleep(1)  # Small delay between requests
            
            if len(responses) == 3:
                # Check if all responses have the same structure
                first_articles = responses[0].get("articles", [])
                consistent = True
                
                for response in responses[1:]:
                    articles = response.get("articles", [])
                    if len(articles) != len(first_articles):
                        consistent = False
                        break
                
                if consistent:
                    self.log_result("news_api", "Consistency Check", True, 
                                  f"All 3 calls returned consistent structure with {len(first_articles)} articles")
                else:
                    self.log_result("news_api", "Consistency Check", False, 
                                  "Inconsistent article counts across multiple calls")
            else:
                self.log_result("news_api", "Consistency Check", False, 
                              f"Only {len(responses)} out of 3 requests succeeded")
                
        except Exception as e:
            self.log_result("news_api", "Consistency Check", False, f"Exception: {str(e)}")
        
        # Test 5: Response time check
        try:
            start_time = time.time()
            response = requests.get(NEWS_ENDPOINT, timeout=10)
            response_time = time.time() - start_time
            
            if response.status_code == 200 and response_time < 3.0:  # Should respond within 3 seconds
                self.log_result("news_api", "Response Time", True, 
                              f"Response time: {response_time:.2f}s (< 3s)")
            else:
                self.log_result("news_api", "Response Time", False, 
                              f"Response time: {response_time:.2f}s or request failed")
                
        except Exception as e:
            self.log_result("news_api", "Response Time", False, f"Exception: {str(e)}")
    
    def test_server_availability(self):
        """Test if the server is running and accessible"""
        print("\n🔍 Testing Server Availability...")
        
        try:
            response = requests.get(BASE_URL, timeout=5)
            if response.status_code in [200, 404]:  # 404 is fine, means server is running
                print(f"✅ Server is accessible at {BASE_URL}")
                return True
            else:
                print(f"❌ Server returned unexpected status: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Server is not accessible: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Victoria Terragrove Backend API Tests")
        print("=" * 60)
        
        # Check server availability first
        if not self.test_server_availability():
            print("\n❌ Cannot proceed with tests - server is not accessible")
            return
        
        # Run API tests
        self.test_newsletter_api()
        self.test_news_api()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        
        for api_name, results in self.results.items():
            passed = results["tests_passed"]
            failed = results["tests_failed"]
            total_passed += passed
            total_failed += failed
            
            print(f"\n{api_name.upper().replace('_', ' ')}:")
            print(f"  ✅ Passed: {passed}")
            print(f"  ❌ Failed: {failed}")
            print(f"  📈 Success Rate: {(passed/(passed+failed)*100):.1f}%" if (passed+failed) > 0 else "  📈 Success Rate: N/A")
        
        print(f"\nOVERALL RESULTS:")
        print(f"  ✅ Total Passed: {total_passed}")
        print(f"  ❌ Total Failed: {total_failed}")
        print(f"  📈 Overall Success Rate: {(total_passed/(total_passed+total_failed)*100):.1f}%" if (total_passed+total_failed) > 0 else "  📈 Overall Success Rate: N/A")
        
        # Print failed tests details
        if total_failed > 0:
            print(f"\n🔍 FAILED TESTS DETAILS:")
            for api_name, results in self.results.items():
                failed_tests = [test for test in results["details"] if not test["passed"]]
                if failed_tests:
                    print(f"\n{api_name.upper().replace('_', ' ')}:")
                    for test in failed_tests:
                        print(f"  ❌ {test['test']}: {test['details']}")

if __name__ == "__main__":
    tester = APITester()
    tester.run_all_tests()