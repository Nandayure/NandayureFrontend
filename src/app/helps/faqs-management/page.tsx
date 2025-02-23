"use client"

import { useState } from "react"
import { Plus, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data (replace with actual data fetching)
const initialCategories = [
  { id: 1, name: "General" },
  { id: 2, name: "Account" },
  { id: 3, name: "Billing" },
]

const initialFaqs = [
  {
    id: 1,
    category_id: 1,
    question: "What is this service?",
    answer: "This is a FAQ management system.",
    status: "active",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    id: 2,
    category_id: 2,
    question: "How do I reset my password?",
    answer: "You can reset your password in the account settings.",
    status: "active",
    created_at: "2023-01-02",
    updated_at: "2023-01-02",
  },
]

export default function FAQManagementPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [faqs, setFaqs] = useState(initialFaqs)
  const [newCategory, setNewCategory] = useState("")
  const [newFaq, setNewFaq] = useState({ category_id: "", question: "", answer: "", status: "active" })

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory.trim() }])
      setNewCategory("")
    }
  }

  const addFaq = () => {
    if (newFaq.category_id && newFaq.question.trim() && newFaq.answer.trim()) {
      setFaqs([
        ...faqs,
        {
          ...newFaq,
          id: faqs.length + 1,
          category_id: Number(newFaq.category_id), // Conversión a number
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      setNewFaq({ category_id: "", question: "", answer: "", status: "active" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-dodger-blue-800">FAQ Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
            <CardDescription>Create a new FAQ category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={addCategory} className="bg-apple-500 hover:bg-apple-600">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add FAQ</CardTitle>
            <CardDescription>Create a new frequently asked question</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={newFaq.category_id} onValueChange={(value) => setNewFaq({ ...newFaq, category_id: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Question"
              value={newFaq.question}
              onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            />
            <Textarea
              placeholder="Answer"
              value={newFaq.answer}
              onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
              rows={4}
            />
            <Button onClick={addFaq} className="w-full bg-dodger-blue-500 hover:bg-dodger-blue-600">
              <Plus className="w-4 h-4 mr-2" /> Add FAQ
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Existing FAQs</CardTitle>
            <CardDescription>Manage your frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="flex justify-between items-start p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium text-dodger-blue-800">{faq.question}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {categories.find((c) => c.id === faq.category_id)?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4 text-golden-dream-600" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

