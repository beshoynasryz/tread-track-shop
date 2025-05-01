
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const AdminSettings = () => {
  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'TreadTrack',
    storeTagline: 'The Ultimate Shoe Store',
    storeEmail: 'contact@treadtrack.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion St, New York, NY 10001',
    logo: 'https://example.com/logo.png',
    currency: 'USD',
    taxRate: '7.5',
  });
  
  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    enableCreditCard: true,
    enablePaypal: true,
    enableCashOnDelivery: false,
    paypalClientId: 'sb-xxxxxxxx',
    stripePublishableKey: 'pk_test_xxxxxxxx',
  });
  
  // Shipping settings
  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: '100',
    standardShippingRate: '5.99',
    expressShippingRate: '15.99',
    shippingCountries: 'USA, Canada',
  });
  
  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    enableOrderConfirmation: true,
    enableShippingNotifications: true,
    enableMarketingEmails: false,
    emailHeader: '<h1>TreadTrack</h1>',
    emailFooter: '<p>© 2023 TreadTrack. All rights reserved.</p>',
  });
  
  // Handle input changes for each settings section
  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentSwitchChange = (name: string, checked: boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleEmailSwitchChange = (name: string, checked: boolean) => {
    setEmailSettings(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  // Handle form submissions
  const saveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Store Settings Saved",
      description: "Your store settings have been updated successfully.",
    });
  };
  
  const savePaymentSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Settings Saved",
      description: "Your payment settings have been updated successfully.",
    });
  };
  
  const saveShippingSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Shipping Settings Saved",
      description: "Your shipping settings have been updated successfully.",
    });
  };
  
  const saveEmailSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Email Settings Saved",
      description: "Your email settings have been updated successfully.",
    });
  };
  
  return (
    <AdminLayout title="Settings">
      <Tabs defaultValue="store" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
        </TabsList>
        
        {/* Store Settings */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Settings</CardTitle>
              <CardDescription>
                Manage your store details and general configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveStoreSettings} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="storeName" 
                      value={storeSettings.storeName}
                      onChange={handleStoreChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeTagline">Store Tagline</Label>
                    <Input 
                      id="storeTagline" 
                      name="storeTagline" 
                      value={storeSettings.storeTagline}
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Email Address</Label>
                    <Input 
                      id="storeEmail" 
                      name="storeEmail" 
                      type="email"
                      value={storeSettings.storeEmail}
                      onChange={handleStoreChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Phone Number</Label>
                    <Input 
                      id="storePhone" 
                      name="storePhone" 
                      value={storeSettings.storePhone}
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Textarea 
                    id="storeAddress" 
                    name="storeAddress" 
                    value={storeSettings.storeAddress}
                    onChange={handleStoreChange}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input 
                      id="logo" 
                      name="logo" 
                      value={storeSettings.logo}
                      onChange={handleStoreChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input 
                      id="currency" 
                      name="currency" 
                      value={storeSettings.currency}
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input 
                      id="taxRate" 
                      name="taxRate" 
                      type="number"
                      step="0.01"
                      value={storeSettings.taxRate}
                      onChange={handleStoreChange}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="bg-teal">Save Store Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>
                Configure your payment methods and processors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={savePaymentSettings} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Credit Card Payments</h4>
                      <p className="text-sm text-gray-500">Accept Visa, Mastercard, Amex, etc.</p>
                    </div>
                    <Switch 
                      checked={paymentSettings.enableCreditCard}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('enableCreditCard', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-sm text-gray-500">Allow customers to pay via PayPal</p>
                    </div>
                    <Switch 
                      checked={paymentSettings.enablePaypal}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('enablePaypal', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-500">Allow customers to pay upon delivery</p>
                    </div>
                    <Switch 
                      checked={paymentSettings.enableCashOnDelivery}
                      onCheckedChange={(checked) => handlePaymentSwitchChange('enableCashOnDelivery', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Payment Gateway Credentials</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
                      <Input 
                        id="stripePublishableKey" 
                        name="stripePublishableKey" 
                        value={paymentSettings.stripePublishableKey}
                        onChange={handlePaymentChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                      <Input 
                        id="paypalClientId" 
                        name="paypalClientId" 
                        value={paymentSettings.paypalClientId}
                        onChange={handlePaymentChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="bg-teal">Save Payment Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure your shipping options and delivery rates.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveShippingSettings} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                  <Input 
                    id="freeShippingThreshold" 
                    name="freeShippingThreshold" 
                    type="number"
                    step="0.01"
                    value={shippingSettings.freeShippingThreshold}
                    onChange={handleShippingChange}
                  />
                  <p className="text-sm text-gray-500">Orders above this amount qualify for free shipping</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping Rate ($)</Label>
                    <Input 
                      id="standardShippingRate" 
                      name="standardShippingRate" 
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingRate}
                      onChange={handleShippingChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingRate">Express Shipping Rate ($)</Label>
                    <Input 
                      id="expressShippingRate" 
                      name="expressShippingRate" 
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingRate}
                      onChange={handleShippingChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shippingCountries">Shipping Countries/Regions</Label>
                  <Textarea 
                    id="shippingCountries" 
                    name="shippingCountries" 
                    value={shippingSettings.shippingCountries}
                    onChange={handleShippingChange}
                    rows={3}
                    placeholder="Enter countries separated by commas"
                  />
                  <p className="text-sm text-gray-500">Enter the countries you ship to, separated by commas</p>
                </div>
                
                <Button type="submit" className="bg-teal">Save Shipping Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure notification emails and marketing messages.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveEmailSettings} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Order Confirmation Emails</h4>
                      <p className="text-sm text-gray-500">Send email when an order is placed</p>
                    </div>
                    <Switch 
                      checked={emailSettings.enableOrderConfirmation}
                      onCheckedChange={(checked) => handleEmailSwitchChange('enableOrderConfirmation', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Shipping Notifications</h4>
                      <p className="text-sm text-gray-500">Send email when an order ships</p>
                    </div>
                    <Switch 
                      checked={emailSettings.enableShippingNotifications}
                      onCheckedChange={(checked) => handleEmailSwitchChange('enableShippingNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Send promotional emails to customers</p>
                    </div>
                    <Switch 
                      checked={emailSettings.enableMarketingEmails}
                      onCheckedChange={(checked) => handleEmailSwitchChange('enableMarketingEmails', checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h4 className="font-medium">Email Templates</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailHeader">Email Header (HTML)</Label>
                    <Textarea 
                      id="emailHeader" 
                      name="emailHeader" 
                      value={emailSettings.emailHeader}
                      onChange={handleEmailChange}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="emailFooter">Email Footer (HTML)</Label>
                    <Textarea 
                      id="emailFooter" 
                      name="emailFooter" 
                      value={emailSettings.emailFooter}
                      onChange={handleEmailChange}
                      rows={3}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="bg-teal">Save Email Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
