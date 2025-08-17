import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { Industry, Role, Resource, Mentor, DailyTip } from '@/lib/types';

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = airtable.base(process.env.AIRTABLE_BASE_ID!);

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting Airtable sync...');

    // Sync Industries
    const industries = await syncIndustries();
    console.log(`Synced ${industries.length} industries`);

    // Sync Roles
    const roles = await syncRoles();
    console.log(`Synced ${roles.length} roles`);

    // Sync Resources
    const resources = await syncResources();
    console.log(`Synced ${resources.length} resources`);

    // Sync Mentors
    const mentors = await syncMentors();
    console.log(`Synced ${mentors.length} mentors`);

    // Sync Daily Tips
    const dailyTips = await syncDailyTips();
    console.log(`Synced ${dailyTips.length} daily tips`);

    return NextResponse.json({
      success: true,
      synced: {
        industries: industries.length,
        roles: roles.length,
        resources: resources.length,
        mentors: mentors.length,
        dailyTips: dailyTips.length,
      },
    });
  } catch (error) {
    console.error('Airtable sync error:', error);
    return NextResponse.json(
      { error: 'Sync failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

async function syncIndustries(): Promise<Industry[]> {
  const records = await base('Industries').select().all();
  const industries: Industry[] = records.map(record => ({
    id: record.id,
    name: record.get('name') as string,
    summary: record.get('summary') as string,
    icon: record.get('icon') as string,
    color: record.get('color') as string,
  }));

  // Clear existing and add new
  const existingDocs = await getDocs(collection(db, 'industries'));
  await Promise.all(existingDocs.docs.map(doc => deleteDoc(doc.ref)));

  await Promise.all(
    industries.map(industry =>
      setDoc(doc(db, 'industries', industry.id), industry)
    )
  );

  return industries;
}

async function syncRoles(): Promise<Role[]> {
  const records = await base('Roles').select().all();
  const roles: Role[] = records.map(record => ({
    id: record.id,
    industryId: record.get('industryId') as string,
    title: record.get('title') as string,
    dailyWork: record.get('dailyWork') as string,
    salaryRangeUK: {
      min: record.get('salaryMin') as number,
      max: record.get('salaryMax') as number,
      currency: 'GBP' as const,
    },
    sponsorship: record.get('sponsorship') as boolean,
    growth: record.get('growth') as string,
    companies: JSON.parse(record.get('companies') as string || '[]'),
    difficulty: JSON.parse(record.get('difficulty') as string || '{}'),
    timeline: JSON.parse(record.get('timeline') as string || '{}'),
    skillsTested: record.get('skillsTested') as string[] || [],
    requirements: record.get('requirements') as string[] || [],
  }));

  // Clear existing and add new
  const existingDocs = await getDocs(collection(db, 'roles'));
  await Promise.all(existingDocs.docs.map(doc => deleteDoc(doc.ref)));

  await Promise.all(
    roles.map(role =>
      setDoc(doc(db, 'roles', role.id), role)
    )
  );

  return roles;
}

async function syncResources(): Promise<Resource[]> {
  const records = await base('Resources').select().all();
  const resources: Resource[] = records.map(record => ({
    id: record.id,
    roleId: record.get('roleId') as string,
    name: record.get('name') as string,
    url: record.get('url') as string,
    type: record.get('type') as Resource['type'],
    description: record.get('description') as string,
    free: record.get('free') as boolean,
  }));

  // Clear existing and add new
  const existingDocs = await getDocs(collection(db, 'resources'));
  await Promise.all(existingDocs.docs.map(doc => deleteDoc(doc.ref)));

  await Promise.all(
    resources.map(resource =>
      setDoc(doc(db, 'resources', resource.id), resource)
    )
  );

  return resources;
}

async function syncMentors(): Promise<Mentor[]> {
  const records = await base('Mentors').select().all();
  const mentors: Mentor[] = records.map(record => ({
    id: record.id,
    name: record.get('name') as string,
    title: record.get('title') as string,
    linkedin_url: record.get('linkedin_url') as string,
    type: record.get('type') as Mentor['type'],
    industry: record.get('industry') as string,
    company: record.get('company') as string,
    bio: record.get('bio') as string,
    hourlyRate: record.get('hourlyRate') as number,
  }));

  // Clear existing and add new
  const existingDocs = await getDocs(collection(db, 'mentors'));
  await Promise.all(existingDocs.docs.map(doc => deleteDoc(doc.ref)));

  await Promise.all(
    mentors.map(mentor =>
      setDoc(doc(db, 'mentors', mentor.id), mentor)
    )
  );

  return mentors;
}

async function syncDailyTips(): Promise<DailyTip[]> {
  const records = await base('DailyTips').select().all();
  const dailyTips: DailyTip[] = records.map(record => ({
    id: record.id,
    tip: record.get('tip') as string,
    category: record.get('category') as string,
    date: record.get('date') as string,
  }));

  // Clear existing and add new
  const existingDocs = await getDocs(collection(db, 'dailyTips'));
  await Promise.all(existingDocs.docs.map(doc => deleteDoc(doc.ref)));

  await Promise.all(
    dailyTips.map(tip =>
      setDoc(doc(db, 'dailyTips', tip.id), tip)
    )
  );

  return dailyTips;
}
