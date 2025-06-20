"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

const testTypes = [
  "Blood Test",
  "X-Ray",
  "MRI Scan",
  "CT Scan",
  "ECG",
  "Ultrasound",
  "Mammography",
  "Endoscopy",
  "Biopsy",
  "Stress Test",
]

const lagosLGAs = [
  "Ikeja",
  "Lagos Island",
  "Lagos Mainland",
  "Surulere",
  "Alimosho",
  "Agege",
  "Ifako-Ijaiye",
  "Shomolu",
  "Mushin",
  "Oshodi-Isolo",
  "Kosofe",
  "Apapa",
  "Ajeromi-Ifelodun",
  "Amuwo-Odofin",
  "Badagry",
  "Epe",
  "Eti-Osa",
  "Ibeju-Lekki",
  "Ikorodu",
  "Ojo",
]

export function SearchSection() {
  const [searchData, setSearchData] = useState({
    testType: "",
    location: "",
    date: "",
  })

  const handleSearch = () => {
    // Navigate to search results page
    const params = new URLSearchParams()
    if (searchData.testType) params.set("test", searchData.testType)
    if (searchData.location) params.set("location", searchData.location)
    if (searchData.date) params.set("date", searchData.date)

    window.location.href = `/search?${params.toString()}`
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Test Type</label>
            <Select
              value={searchData.testType}
              onValueChange={(value) => setSearchData((prev) => ({ ...prev, testType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {testTypes.map((test) => (
                  <SelectItem key={test} value={test}>
                    {test}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <Select
              value={searchData.location}
              onValueChange={(value) => setSearchData((prev) => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select LGA" />
              </SelectTrigger>
              <SelectContent>
                {lagosLGAs.map((lga) => (
                  <SelectItem key={lga} value={lga}>
                    {lga}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Preferred Date</label>
            <Input
              type="date"
              value={searchData.date}
              onChange={(e) => setSearchData((prev) => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
