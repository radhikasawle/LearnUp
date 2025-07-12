// challenges.js

const challenges = [
  // Append to window.challenges

{
  title: "Merge Two Sorted Lists",
  difficulty: "easy",
  description: "Merge two sorted linked lists and return it as a sorted list.",
  questions: [
    "mergeTwoLists([1,2,4], [1,3,4]) ➞ [1,1,2,3,4,4]",
    "mergeTwoLists([], []) ➞ []",
    "mergeTwoLists([], [0]) ➞ [0]"
  ],
  solutions: {
    java: `
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0), cur = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}
    `,
    cpp: `
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0), *cur = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) {
            cur->next = l1;
            l1 = l1->next;
        } else {
            cur->next = l2;
            l2 = l2->next;
        }
        cur = cur->next;
    }
    cur->next = l1 ? l1 : l2;
    return dummy.next;
}
    `,
    c: `
// Assumes ListNode defined as struct { int val; ListNode *next; }
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy = {0, NULL}, *cur = &dummy;
    while (l1 && l2) {
        if (l1->val < l2->val) {
            cur->next = l1;
            l1 = l1->next;
        } else {
            cur->next = l2;
            l2 = l2->next;
        }
        cur = cur->next;
    }
    cur->next = l1 ? l1 : l2;
    return dummy.next;
}
    `,
    python: `
def mergeTwoLists(l1, l2):
    dummy = ListNode(0)
    cur = dummy
    while l1 and l2:
        if l1.val < l2.val:
            cur.next = l1
            l1 = l1.next
        else:
            cur.next = l2
            l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next
    `
  }
},

{
  title: "Valid Parentheses",
  difficulty: "easy",
  description: "Given a string containing '()[]{}', determine if it's valid (properly closed and nested).",
  questions: [
    "isValid('()') ➞ true",
    "isValid('()[]{}') ➞ true",
    "isValid('(]') ➞ false",
    "isValid('([)]') ➞ false"
  ],
  solutions: {
    java: `
public boolean isValid(String s) {
    Stack<Character> st = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(')');
        else if (c == '[') st.push(']');
        else if (c == '{') st.push('}');
        else if (st.isEmpty() || st.pop() != c) return false;
    }
    return st.isEmpty();
}
    `,
    cpp: `
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '[') st.push(']');
        else if (c == '{') st.push('}');
        else {
            if (st.empty() || st.top() != c) return false;
            st.pop();
        }
    }
    return st.empty();
}
    `,
    c: `
// Uses char stack implemented as array
bool isValid(char* s) {
    int top = 0;
    char st[1000];
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == '(') st[top++] = ')';
        else if (c == '[') st[top++] = ']';
        else if (c == '{') st[top++] = '}';
        else {
            if (top == 0 || st[--top] != c) return false;
        }
    }
    return top == 0;
}
    `,
    python: `
def isValid(s):
    stack = []
    mapping = {'(':')','[':']','{':'}'}
    for c in s:
        if c in mapping:
            stack.append(mapping[c])
        else:
            if not stack or stack.pop() != c:
                return False
    return not stack
    `
  }
},

{
  title: "Product of Array Except Self",
  difficulty: "medium",
  description: "Return an array such that output[i] is product of all elements except nums[i], without using division.",
  questions: [
    "productExceptSelf([1,2,3,4]) ➞ [24,12,8,6]",
    "productExceptSelf([-1,1,0,-3,3]) ➞ [0,0,9,0,0]"
  ],
  solutions: {
    java: `
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] res = new int[n];
    res[0] = 1;
    for (int i = 1; i < n; i++)
        res[i] = res[i-1] * nums[i-1];
    int right = 1;
    for (int i = n-1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}
    `,
    cpp: `
vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n,1);
    for (int i = 1; i < n; i++)
        res[i] = res[i-1] * nums[i-1];
    int right = 1;
    for (int i = n-1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
}
    `,
    c: `
// Assumes nums array, output pre-allocated with same size
void productExceptSelf(int* nums, int n, int* res) {
    res[0] = 1;
    for (int i = 1; i < n; i++)
        res[i] = res[i-1] * nums[i-1];
    int right = 1;
    for (int i = n-1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
}
    `,
    python: `
def productExceptSelf(nums):
    n = len(nums)
    res = [1] * n
    for i in range(1, n):
        res[i] = res[i-1] * nums[i-1]
    right = 1
    for i in reversed(range(n)):
        res[i] *= right
        right *= nums[i]
    return res
    `
  }
},
  {
    title: "Jump Game",
    difficulty: "medium",
    description: "Determine if you can reach the last index given jump lengths at each position.",
    questions: [
      "canJump([2,3,1,1,4]) ➞ true",
      "canJump([3,2,1,0,4]) ➞ false",
      "canJump([0]) ➞ true"
    ],
    solutions: {
      java: `
public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}
      `,
      cpp: `
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}
      `,
      c: `
bool canJump(int* nums, int numsSize) {
    int maxReach = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > maxReach) return false;
        if (i + nums[i] > maxReach) maxReach = i + nums[i];
    }
    return true;
}
      `,
      python: `
def canJump(nums):
    max_reach = 0
    for i, val in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + val)
    return True
      `
    }
  },
  {
    title: "Number of Islands",
    difficulty: "medium",
    description: "Count the number of islands in a 2D grid using DFS.",
    questions: [
      "numIslands([['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]) ➞ 3"
    ],
    solutions: {
      java: `
public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
}
void dfs(char[][] grid, int i, int j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == '0') return;
    grid[i][j] = '0';
    dfs(grid, i+1, j); dfs(grid, i-1, j); dfs(grid, i, j+1); dfs(grid, i, j-1);
}
      `,
      cpp: `
void dfs(vector<vector<char>>& grid, int i, int j) {
    if (i < 0 || j < 0 || i >= grid.size() || j >= grid[0].size() || grid[i][j] == '0') return;
    grid[i][j] = '0';
    dfs(grid, i+1, j); dfs(grid, i-1, j); dfs(grid, i, j+1); dfs(grid, i, j-1);
}
int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < grid.size(); i++) {
        for (int j = 0; j < grid[0].size(); j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
}
      `,
      c: `
// For simplicity, assumes grid is char** and dimensions known
void dfs(char** grid, int i, int j, int rows, int cols) {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] == '0') return;
    grid[i][j] = '0';
    dfs(grid, i+1, j, rows, cols);
    dfs(grid, i-1, j, rows, cols);
    dfs(grid, i, j+1, rows, cols);
    dfs(grid, i, j-1, rows, cols);
}
int numIslands(char** grid, int rows, int cols) {
    int count = 0;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j, rows, cols);
                count++;
            }
        }
    }
    return count;
}
      `,
      python: `
def numIslands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    def dfs(i, j):
        if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] == '0':
            return
        grid[i][j] = '0'
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    count = 0
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    return count
      `
    }
  },
  {
    title: "Binary Tree Inorder Traversal",
    difficulty: "easy",
    description: "Return the inorder traversal of a binary tree's nodes' values.",
    questions: [
      "inorderTraversal([1,null,2,3]) ➞ [1,3,2]",
      "inorderTraversal([4,2,5,1,3]) ➞ [1,2,3,4,5]",
      "inorderTraversal([7,3,9,2,null,8]) ➞ [2,3,7,8,9]"
    ],
    solutions: {
      javascript: `
function inorderTraversal(root) {
  let res = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    res.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  return res;
}
      `,
      java: `
import java.util.*;
class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    inorder(root, res);
    return res;
}
private void inorder(TreeNode node, List<Integer> res) {
    if (node == null) return;
    inorder(node.left, res);
    res.add(node.val);
    inorder(node.right, res);
}
      `,
      cpp: `
#include <vector>
using namespace std;
struct TreeNode {
    int val; TreeNode* left; TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
void inorder(TreeNode* node, vector<int>& res) {
    if (!node) return;
    inorder(node->left, res);
    res.push_back(node->val);
    inorder(node->right, res);
}
vector<int> inorderTraversal(TreeNode* root) {
    vector<int> res;
    inorder(root, res);
    return res;
}
      `,
      python: `
from typing import Optional, List
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def inorderTraversal(root: Optional[TreeNode]) -> List[int]:
    res = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        res.append(node.val)
        inorder(node.right)
    inorder(root)
    return res
      `,
      c: `
#include <stdlib.h>
#include <stdio.h>
typedef struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

void inorder(TreeNode* node, int* res, int* index) {
    if (!node) return;
    inorder(node->left, res, index);
    res[(*index)++] = node->val;
    inorder(node->right, res, index);
}

// Usage:
// int res[100];
// int idx = 0;
// inorder(root, res, &idx);
      `
    }
  },
  {
    title: "Climbing Stairs",
    difficulty: "easy",
    description: "You can climb 1 or 2 steps at a time. How many ways to reach the top (n steps)?",
    questions: [
      "climbStairs(5) ➞ 8",
      "climbStairs(10) ➞ 89",
      "climbStairs(1) ➞ 1"
    ],
    solutions: {
      javascript: `
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
      `,
      java: `
public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}
      `,
      cpp: `
int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = b;
        b = a + b;
        a = temp;
    }
    return b;
}
      `,
      python: `
def climbStairs(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n+1):
        a, b = b, a + b
    return b
      `
    }
  },
  {
    title: "Reverse a String",
    difficulty: "easy",
    description: "Reverse a given string.",
    questions: [
      "reverseString('hello') ➞ 'olleh'",
      "reverseString('world') ➞ 'dlrow'",
      "reverseString('abcde') ➞ 'edcba'"
    ],
    solutions: {
      javascript: `
function reverseString(s) {
  return s.split('').reverse().join('');
}
      `,
      java: `
public String reverseString(String s) {
    return new StringBuilder(s).reverse().toString();
}
      `,
      cpp: `
#include <string>
using namespace std;
string reverseString(string s) {
    reverse(s.begin(), s.end());
    return s;
}
      `,
      python: `
def reverseString(s):
    return s[::-1]
      `
    }
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    description: "Find length of the longest substring without repeating characters.",
    questions: [
      "lengthOfLongestSubstring('abcabcbb') ➞ 3",
      "lengthOfLongestSubstring('bbbbb') ➞ 1",
      "lengthOfLongestSubstring('pwwkew') ➞ 3"
    ],
    solutions: {
      javascript: `
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
      `,
      java: `
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left) {
            left = map.get(c) + 1;
        }
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
      `,
      cpp: `
int lengthOfLongestSubstring(string s) {
    unordered_map<char,int> map;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); right++) {
        if (map.count(s[right]) && map[s[right]] >= left) {
            left = map[s[right]] + 1;
        }
        map[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}
      `,
      python: `
def lengthOfLongestSubstring(s):
    map = {}
    left = 0
    maxLen = 0
    for right, c in enumerate(s):
        if c in map and map[c] >= left:
            left = map[c] + 1
        map[c] = right
        maxLen = max(maxLen, right - left + 1)
    return maxLen
      `
    }
  }
];

// Export for use in solve.html or main app script if using modules
// But since we're using vanilla JS, attach to window for global access
window.challenges = challenges;


// DOM logic for main challenge listing page (assumes exists elements #challengeList and #difficultyFilter)
window.addEventListener('DOMContentLoaded', () => {
  const challengeList = document.getElementById('challengeList');
  const difficultyFilter = document.getElementById('difficultyFilter');

  function renderChallenges(filter = 'all') {
    challengeList.innerHTML = '';
    challenges
      .filter(ch => filter === 'all' || ch.difficulty === filter)
      .forEach((challenge, index) => {
        const div = document.createElement('div');
        div.classList.add('challenge-card');
        div.innerHTML = `
          <h3>${challenge.title}</h3>
          <p>${challenge.description}</p>
          <strong>Difficulty:</strong> <span>${challenge.difficulty}</span><br/>
          <button data-index="${index}" class="solve-btn">Solve</button>
        `;
        challengeList.appendChild(div);
      });
  }

  difficultyFilter.addEventListener('change', e => {
    renderChallenges(e.target.value);
  });

    challengeList.addEventListener('click', e => {
    if (e.target.classList.contains('solve-btn') || e.target.classList.contains('solution-btn')) {
      const idx = e.target.getAttribute('data-index');
      localStorage.setItem('selectedChallengeIndex', idx);
      const destination = e.target.classList.contains('solve-btn') ? 'solve.html' : 'solution.html';
      window.location.href = destination;
    }
  });

  renderChallenges();
});
